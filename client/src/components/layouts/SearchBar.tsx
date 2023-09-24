import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [enteredKeyword, setEnteredKeyword] = useState(
    searchParams.get("search") || "",
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const searchKeyword = enteredKeyword.trim();
    if (!isTouched) return;

    setTimer(
      setTimeout(async () => {
        let url = "/";
        if (searchKeyword.length > 0) url = `/products?search=${searchKeyword}`;
        if (location.pathname !== url) navigate(url);
      }, 500),
    );
  }, [enteredKeyword]);

  return (
    <input
      type="text"
      className={`min-w-[50%] rounded text-xl p-1 px-4 text-accent outline-none`}
      placeholder={"Search Products..."}
      value={enteredKeyword}
      onChange={(e) => {
        setIsTouched(true);
        setEnteredKeyword(e.target.value);
      }}
    />
  );
};

export default SearchBar;
