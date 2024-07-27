// 自动下载类型包，拿到源码分析所属的包自动下载
import { setupTypeAcquisition } from "@typescript/ata";
import typescriprt from "typescript";

export function createATA(
  onDownloadFile: (code: string, path: string) => void
) {
  const ata = setupTypeAcquisition({
    projectName: "my-ata",
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        onDownloadFile(code, path);
      },
    },
  });

  return ata;
}
