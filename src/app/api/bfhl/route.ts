import { error } from "console"
import { NextResponse } from "next/server"

// eslint-disable-next-line
export async function GET(request: Request) {
    return NextResponse.json({ "operation_code": 1 })
}
type RequestData = {
    data: string[]
    file_b64?: string
}
export async function POST(request: Request) {
    try {
        const data = JSON.parse(await request.text()) as RequestData;
        const ActualData = data.data;
        const numbers = ActualData.filter(item => !isNaN(Number(item)));
        const alphabets = ActualData.filter(item => isNaN(Number(item)));
        const highestLowercaseAlphabet = alphabets
            .filter(char => char.toLowerCase() === char)
            .sort((a, b) => b.localeCompare(a))[0] || [];

        const file_b64 = data.file_b64;

        // Process the file (simplified)
        const fileValid = !!file_b64;
        const fileMimeType = fileValid ? 'application/octet-stream' : undefined;
        const fileSizeKb = fileValid ? Buffer.from(file_b64, 'base64').length / 1024 : undefined;
        return NextResponse.json({ "is_success": true, "name": "karthikchidambaram_12122003", email: "aa6331@srmist.edu.in", "roll_number": "RA2111003010784", numbers: numbers, alphabets: alphabets, highest_lowercase_alphabet: highestLowercaseAlphabet, file_valid: fileValid, file_mime_type: fileMimeType, file_size_kb: fileSizeKb })
    }
    catch {
        // eslint-disable-next-line
        error
    } {
        return NextResponse.json({ "is_success": false })
    }

}