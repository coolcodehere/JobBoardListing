import { readFileSync } from "fs";
import axios from "axios";

export async function getFile(
  path: string,
  useLocalFile: boolean
): Promise<string> {
  if (useLocalFile) {
    return readFileSync(path, "utf8");
  } else {
    return await axios.get(path);
  }
}
