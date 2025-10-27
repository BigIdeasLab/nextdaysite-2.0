import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    // Get migration files from supabase/migrations directory
    const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations')

    // Check if directory exists
    if (!fs.existsSync(migrationsDir)) {
      return NextResponse.json(
        { error: 'Migrations directory not found' },
        { status: 404 },
      )
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
    files.sort()

    const results = []
    let hasErrors = false

    for (const file of files) {
      try {
        const filePath = path.join(migrationsDir, file)
        const sql = fs.readFileSync(filePath, 'utf-8')

        // Execute the SQL
        const { error } = await supabase.rpc('exec', { sql })

        if (error) {
          results.push({
            file,
            status: 'error',
            message: error.message,
          })
          hasErrors = true
        } else {
          results.push({
            file,
            status: 'success',
            message: 'Migration executed',
          })
        }
      } catch (error) {
        results.push({
          file,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        })
        hasErrors = true
      }
    }

    return NextResponse.json({
      success: !hasErrors,
      results,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to run migrations',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
