import { describe, expect, it } from "vitest";
import { content, validateContact } from "@/lib/axon-content";
const valid = {
  name: "Ahmed",
  company: "Example",
  email: "ahmed@example.com",
  phone: "+966501234567",
  service: "Odoo",
  message: "We need an ERP implementation.",
};
describe("AXON consultation validation", () => {
  it("accepts a complete consultation request", () => expect(validateContact(valid)).toEqual({}));
  it("rejects missing required consultation details", () =>
    expect(
      validateContact({ ...valid, name: "", company: "", email: "", service: "", message: "" }),
    ).toEqual({
      name: "required",
      company: "required",
      email: "required",
      service: "required",
      message: "required",
    }));
  it("rejects an invalid email", () =>
    expect(validateContact({ ...valid, email: "not-an-email" }).email).toBe("invalidEmail"));
  it("rejects an invalid phone", () =>
    expect(validateContact({ ...valid, phone: "wrong" }).phone).toBe("invalidPhone"));
  it("includes all eight requested services in both languages", () => {
    expect(content.en.services.length).toBe(8);
    expect(content.ar.services.length).toBe(8);
  });
});
