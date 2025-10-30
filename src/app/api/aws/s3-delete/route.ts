import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json()
    console.log('Attempting to delete object with key:', key)

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME
    const region = process.env.AWS_S3_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

    console.log('Bucket Name:', bucketName)
    console.log('Region:', region)

    if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
      console.error('AWS S3 credentials not configured')
      return NextResponse.json(
        { error: 'AWS S3 credentials not configured' },
        { status: 500 },
      )
    }

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    })

    const s3 = new AWS.S3()

    const params = {
      Bucket: bucketName,
      Key: key,
    }

    await s3.deleteObject(params).promise()

    console.log('Image deleted successfully:', key)
    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting image from S3:', error)
    return NextResponse.json(
      { error: 'Failed to delete image', details: error.message },
      { status: 500 },
    )
  }
}
