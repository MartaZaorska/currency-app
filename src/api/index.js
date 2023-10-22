export async function fetchData(url){
  const res = await fetch(url, {
    headers: {
      'apikey': import.meta.env.VITE_API_KEY
    }
  });

  if(res.status !== 200) throw new Error("Could not fetch data");

  const data = await res.json();
  return data;
}