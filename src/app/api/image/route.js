import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const encodedUrl = searchParams.get('q');

  if (!encodedUrl) {
    return new NextResponse('Missing image source', { status: 400 });
  }

  try {
    // 1. 將 Base64 亂碼還原成真實嘅 Firebase 網址
    const targetUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

    // 2. 安全防護：只允許代理 Firebase 嘅圖片，防止駭客利用您個網做公開跳板
    if (!targetUrl.startsWith('https://firebasestorage.googleapis.com/')) {
        return new NextResponse('Unauthorized source', { status: 403 });
    }

    // 3. 去 Firebase 抓取圖片
    const response = await fetch(targetUrl);
    const arrayBuffer = await response.arrayBuffer();

    // 4. 將圖片直接回傳俾瀏覽器，並加入 Cache-Control (緩存 1 日)，大幅節省 Firebase 流量
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    return new NextResponse('Error loading image', { status: 500 });
  }
}
