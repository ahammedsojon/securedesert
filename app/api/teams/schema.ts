import { z } from "zod";

const schema = z.object({
  name: z.string(),
  leader: z.string(),
  password: z.string(),
});
export default schema;
