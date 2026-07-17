import { type INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";

// End-to-end against the real Postgres in DATABASE_URL. Reads exercise the
// seeded geo tables (countries); writes go to the empty `tags` table and clean
// up after themselves so the shared DB is left untouched.
// Skipped when DATABASE_URL is unset (e.g. fork PRs without the secret).
const describeE2e = process.env.DATABASE_URL ? describe : describe.skip;

describeE2e("API (e2e)", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
				transformOptions: { enableImplicitConversion: true },
			}),
		);
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe("countries (read)", () => {
		it("paginates", async () => {
			const res = await request(app.getHttpServer())
				.get("/countries?limit=5")
				.expect(200);
			expect(res.body.total).toBe(50);
			expect(res.body.data).toHaveLength(5);
			expect(res.body.limit).toBe(5);
			expect(res.body.page).toBe(1);
		});

		it("eager-loads the region relation", async () => {
			const res = await request(app.getHttpServer())
				.get("/countries?limit=1&withRegion=true")
				.expect(200);
			const [country] = res.body.data;
			expect(country).toHaveProperty("region");
			// region is either a joined object or null, never a bag of nulls
			if (country.region !== null) {
				expect(typeof country.region).toBe("object");
				expect(country.region).toHaveProperty("name");
			}
		});

		it("filters by code (case-insensitive)", async () => {
			const res = await request(app.getHttpServer())
				.get("/countries?limit=50")
				.expect(200);
			const sample = res.body.data[0];
			const filtered = await request(app.getHttpServer())
				.get(`/countries?code=${sample.code.toLowerCase()}`)
				.expect(200);
			expect(filtered.body.total).toBeGreaterThanOrEqual(1);
			expect(filtered.body.data[0].code.toLowerCase()).toBe(
				sample.code.toLowerCase(),
			);
		});

		it("fetches one by id", async () => {
			const list = await request(app.getHttpServer()).get("/countries?limit=1");
			const id = list.body.data[0].id;
			const res = await request(app.getHttpServer())
				.get(`/countries/${id}`)
				.expect(200);
			expect(res.body.id).toBe(id);
		});

		it("404s for a missing country", async () => {
			await request(app.getHttpServer()).get("/countries/99999999").expect(404);
		});

		it("400s for a non-numeric id", async () => {
			await request(app.getHttpServer()).get("/countries/abc").expect(400);
		});
	});

	describe("tags (write, uuid pk)", () => {
		let createdId: string;

		it("creates a tag with a generated uuid", async () => {
			const res = await request(app.getHttpServer())
				.post("/tags")
				.send({ name: `e2e-${Date.now()}` })
				.expect(201);
			expect(res.body.id).toMatch(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
			);
			createdId = res.body.id;
		});

		it("fetches the created tag by uuid", async () => {
			await request(app.getHttpServer())
				.get(`/tags/${createdId}`)
				.expect(200);
		});

		it("rejects an invalid uuid with 400", async () => {
			await request(app.getHttpServer()).get("/tags/not-a-uuid").expect(400);
		});

		it("deletes the tag and then 404s", async () => {
			await request(app.getHttpServer())
				.delete(`/tags/${createdId}`)
				.expect(200);
			await request(app.getHttpServer())
				.get(`/tags/${createdId}`)
				.expect(404);
		});
	});
});
