import {
  Autocomplete,
  FilterOptionsState,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { ChangeEvent, useMemo } from "react";
import { StockList } from "types/stockTypes";

export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const options = useMemo(
    () => stockLists.map((option) => option.name),
    [stockLists]
  );

  const filter = useMemo(() => createFilterOptions<string>(), []);

  const filterOptions = useMemo(() => {
    return (options: string[], params: FilterOptionsState<string>) => {
      const { inputValue } = params;
      if (inputValue === "") return [];

      const filtered = filter(options, { ...params, inputValue: value });
      return filtered;
    };
  }, [filter, value]);

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={options}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          label="종목 이름"
          {...params}
          size="small"
          placeholder="ex) 삼성전자"
          fullWidth
          {...{ value, onChange }}
        />
      )}
    />
  );
}

const stockLists: StockList[] = [
  { ticker: "343090", name: "HLB사이언스", market: "KONEX" },
  { ticker: "67630", name: "HLB생명과학", market: "KOSDAQ" },
  { ticker: "24850", name: "HLB이노베이션", market: "KOSDAQ" },
  { ticker: "47920", name: "HLB제약", market: "KOSDAQ" },
];
