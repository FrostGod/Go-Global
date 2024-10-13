import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createServerClient();
  const data = await request.json();

  try {
    const { data: insertedData, error } = await supabase
      .from('expansion_info')
      .insert([data])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data: insertedData });
  } catch (error: unknown) {
    console.error('Error adding company:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
