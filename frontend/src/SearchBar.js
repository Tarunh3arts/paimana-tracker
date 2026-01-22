function SearchBar({setSearch}){
  return(
    <input
      placeholder="Search project..."
      className="p-2 rounded bg-black/40"
      onChange={e=>setSearch(e.target.value)}
    />
  )
}
export default SearchBar;
