export async function fetchData(url){
  const res = await fetch(url);

  if(res.status !== 200) throw new Error("Could not fetch data");

  const data = await res.json();
  return data;
}