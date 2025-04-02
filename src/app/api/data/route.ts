import { NextResponse } from 'next/server'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!

// List of topics that might be interesting to compare
const topics = [
  { category: 'Tech', items: ['Apple', 'Microsoft', 'Google', 'Meta', 'Amazon', 'Netflix', 'Tesla', 'Spotify'] },
  { category: 'Food', items: ['Pizza', 'Sushi', 'Burger', 'Pasta', 'Taco', 'Curry', 'Ramen', 'Kimchi'] },
  { category: 'Countries', items: ['Japan', 'Brazil', 'India', 'Canada', 'Australia', 'Nigeria', 'Egypt', 'Sweden'] },
  { category: 'Movies', items: ['Star Wars', 'Avengers', 'Titanic', 'Jurassic Park', 'Harry Potter', 'Fast and Furious', 'James Bond', 'The Godfather'] },
  { category: 'Sports', items: ['Football', 'Basketball', 'Tennis', 'Cricket', 'Golf', 'Swimming', 'Baseball', 'Boxing'] },
]

// List of countries where we'll check search interest
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

// Fetches a real image from Unsplash based on the term
const getImageUrl = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    )

    const data = await res.json()
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small
    } else {
      return `https://placehold.co/300x200?text=${encodeURIComponent(query)}`
    }
  } catch (err) {
    console.error(`Image fetch failed for ${query}:`, err)
    return `https://placehold.co/300x200?text=${encodeURIComponent(query)}`
  }
}

export async function GET() {
  try {
    // Select a random category
    const randomCategory = topics[Math.floor(Math.random() * topics.length)]

    // Choose two random items from the category
    const allItems = topics.flatMap(topic => topic.items)

const shuffled = [...allItems].sort(() => 0.5 - Math.random())
const item1 = shuffled[0]
const item2 = shuffled[1]

    // Choose a random country
    const country = countries[Math.floor(Math.random() * countries.length)]

    // Get real image URLs from Unsplash
    const image1 = await getImageUrl(item1)
    const image2 = await getImageUrl(item2)

    // Randomly pick which is more obscure (replace with actual logic later)
    const obscure = Math.random() > 0.5 ? item1 : item2

    return NextResponse.json({
      item1: {
        name: item1,
        image: image1,
      },
      item2: {
        name: item2,
        image: image2,
      },
      country: country.name,
      category: randomCategory.category,
      obscure: obscure === item1, // true if item1 is more obscure
    })
  } catch (error) {
    console.error('Error generating data:', error)
    return NextResponse.json({ error: 'Failed to generate data' }, { status: 500 })
  }
}
