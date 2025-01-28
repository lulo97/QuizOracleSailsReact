import { useState } from "react";
import { Layout } from "../../layouts/Layout";
import { Button } from "@mantine/core";
import { Table } from "@mantine/core";

export function Subjects() {
    const [data, setData] = useState([]);

    async function fetchData() {
        const result_fetch = await fetch("http://localhost:1337/subjects", {
            method: "GET",
        });
        const result_json = await result_fetch.json();
        const { data, error_code, error_message } = result_json;
        setData(data);
    }

    const rows = data.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>{element.parent_id}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Layout>
            <div>
                <Button onClick={fetchData}>FetchData</Button>
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Id</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Description</Table.Th>
                            <Table.Th>ParentId</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </div>
        </Layout>
    );
}
