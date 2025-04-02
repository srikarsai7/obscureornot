import { NextResponse } from 'next/server'
import googleTrends from 'google-trends-api'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!

const topics = [
  { category: 'Tech', items: ['Apple', 'Microsoft', 'Google', 'Meta', 'Amazon', 'Netflix', 'Tesla', 'Spotify'] },
  { category: 'Food', items: ['Pizza', 'Sushi', 'Burger', 'Pasta', 'Taco', 'Curry', 'Ramen', 'Kimchi'] },
  { category: 'Countries', items: ['Japan', 'Brazil', 'India', 'Canada', 'Australia', 'Nigeria', 'Egypt', 'Sweden'] },
  { category: 'Movies', items: ['Star Wars', 'Avengers', 'Titanic', 'Jurassic Park', 'Harry Potter', 'Fast and Furious', 'James Bond', 'The Godfather'] },
  { category: 'Sports', items: ['Football', 'Basketball', 'Tennis', 'Cricket', 'Golf', 'Swimming', 'Baseball', 'Boxing'] },
]

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'India', code: 'IN' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Germany', code: 'DE' },
  { name: 'Australia', code: 'AU' },
  { name: 'Canada', code: 'CA' },
  { name: 'France', code: 'FR' },
  { name: 'South Africa', code: 'ZA' },
]

const getImageUrl = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const data = await res.json()
    if (data.results?.length > 0) {
      return data.results[0].urls.small
    }
    return `https://placehold.co/300x200?text=${encodeURIComponent(query)}`
  } catch (err) {
    console.error(`Image fetch failed for ${query}:`, err)
    return `https://placehold.co/300x200?text=${encodeURIComponent(query)}`
  }
}

const getSearchInterest = async (keyword: string, geo: string): Promise<number> => {
  try {
    const results = await googleTrends.interestOverTime({
      keyword,
      geo,
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // last 30 days
    })
    const parsed = JSON.parse(results)
    const values = parsed.default.timelineData.map((d: { value: number[] }) => d.value[0])
    const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length
    return avg
  } catch (err) {
    console.error(`Failed to get interest for ${keyword}:`, err)
    return 0
  }
}

export async function GET() {
  try {
    const randomCategory = topics[Math.floor(Math.random() * topics.length)]
    const allItems = topics.flatMap(topic => topic.items)
    const shuffled = [...allItems].sort(() => 0.5 - Math.random())
    const item1 = shuffled[0]
    const item2 = shuffled[1]
    const country = countries[Math.floor(Math.random() * countries.length)]

    const [image1, image2] = await Promise.all([getImageUrl(item1), getImageUrl(item2)])

    const [interest1, interest2] = await Promise.all([
      getSearchInterest(item1, country.code),
      getSearchInterest(item2, country.code),
    ])

    const obscure = interest1 < interest2 ? item1 : item2

    return NextResponse.json({
      item1: { name: item1, image: image1, interest: interest1 },
      item2: { name: item2, image: image2, interest: interest2 },
      country: country.name,
      category: randomCategory.category,
      obscure: obscure === item1, // true if item1 is more obscure
    })
  } catch (error) {
    console.error('Error generating data:', error)
    return NextResponse.json({ error: 'Failed to generate data' }, { status: 500 })
  }
}
