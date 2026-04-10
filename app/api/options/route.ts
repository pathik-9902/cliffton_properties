import { NextResponse } from 'next/server';
import { getSearchAndFilterOptions } from '@/lib/services/fetchOptions';

export async function GET() {
  try {
    const options = await getSearchAndFilterOptions();
    return NextResponse.json(options);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch options' }, { status: 500 });
  }
}
