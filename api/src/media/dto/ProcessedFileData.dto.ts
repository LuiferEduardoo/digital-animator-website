export interface ProcessedFileData {
    name: string;
    folder: string;
    format: string;
    file_size: string;
    url: string;
    width?: number;
    height?: number;
    duration?: number;
    resolution?: string;
    number_frames?: number;
    duration_each_frame?: number;
}