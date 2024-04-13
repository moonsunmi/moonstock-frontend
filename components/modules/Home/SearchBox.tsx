import {
  Autocomplete,
  FilterOptionsState,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { ChangeEvent, useMemo } from "react";
import { Stock } from "types/stockTypes";

type SearchBoxProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  stockList: Stock[];
};

export default function SearchBox({
  value,
  onChange,
  stockList,
}: SearchBoxProps) {
  const options = useMemo(
    () => stockList.map((option) => option.name),
    [stockList]
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
