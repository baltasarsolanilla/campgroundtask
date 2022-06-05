interface SearchBar {
  value: string;
  onChange(s: string): void;
  onSearch(): void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBar) {
  return (
    <form className='input-group mb-4 mt-3'>
      <input
        value={value}
        onChange={(event: React.FormEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        type='text'
        className='form-control'
        placeholder='Search for campgrounds'
        aria-label='Search for campgrounds'
        aria-describedby='button-addon2'
      />
      <button
        type='submit'
        className='btn btn-outline-secondary'
        id='button-addon2'
        onClick={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        Search
      </button>
    </form>
  );
}
