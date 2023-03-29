import { Input, Layout, Row } from "antd";
import { useDebouncedSearch } from "hooks/useDebouncedSearch";
import React from "react";

const { Header } = Layout;

const SearchComponent: React.FC = () => {
  const [search, setSearch] = useDebouncedSearch();

  return (
    <Header>
      <Row style={{ height: "100%" }} align="middle">
        <Input
          placeholder="Поиск в почте"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
    </Header>
  );
};

export default SearchComponent;
