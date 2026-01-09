import { UPLOADED_IMAGE_FILES_FORMATS } from "~/config/uploaded-files";

export default function (filename: string): boolean {
    const extension = filename
        .toLowerCase()
        .slice(Math.max(0, filename.lastIndexOf('.'))) as typeof UPLOADED_IMAGE_FILES_FORMATS[number];
    return UPLOADED_IMAGE_FILES_FORMATS.includes(extension);
}
