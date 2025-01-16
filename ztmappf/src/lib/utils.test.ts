// tests/unit/utils.test.ts
import { fetchData } from "@/lib/utils";
import { jest } from "@jest/globals";

const createMockResponse = (data: any, status = 200): Response =>
  ({
    json: jest.fn(() => Promise.resolve(data)),
    status,
    ok: status >= 200 && status < 300,
    headers: new Headers(),
    redirected: false,
    statusText: status === 200 ? "OK" : "Error",
    url: "",
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  } as unknown as Response);

describe("fetchData", () => {
  beforeEach(() => {
    (global.fetch as any) = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return parsed JSON data", async () => {
    // Mockowanie fetch z poprawną odpowiedzią
    (global.fetch as any).mockResolvedValueOnce(
      createMockResponse({ data: "mockData" })
    );

    const data = await fetchData("/test");

    expect(data).toEqual({ data: "mockData" });
    expect(global.fetch).toHaveBeenCalledWith("/test");
  });

  test("should throw an error if fetch fails", async () => {
    // Mockowanie fetch z błędem sieci
    (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchData("/test")).rejects.toThrow("Network error");
  });

  test("should throw an error if status is not 200", async () => {
    // Mockowanie fetch z nieprawidłowym statusem
    (global.fetch as any).mockResolvedValueOnce(createMockResponse({}, 500));

    await expect(fetchData("/test")).rejects.toThrow("Failed to fetch");
  });
});
