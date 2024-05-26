import express from 'express'
import { extract } from '@extractus/article-extractor'

const app = express()

const meta = {
  service: 'article-parser',
  lang: 'javascript',
  server: 'express',
  platform: 'node',
}

app.get('/', async (req, res) => {
  const url = req.query.url
  console.log('Extracting from url: ${url}')
  if (!url) {
    return res.json(meta)
  }
  try {
    const data = await extract(url)
    console.log('Extraction succeed! Url: ${url}')
    return res.json({
      error: 0,
      message: 'article has been extracted successfully',
      data,
      meta,
    })
  } catch (err) {
    console.log('Failed to extract from url: ${url}')
    return res.json({
      error: 1,
      message: err.message,
      data: null,
      meta,
    })
  }
})

app.listen(3100, () => {
  console.log('Server is running at http://localhost:3100')
})
