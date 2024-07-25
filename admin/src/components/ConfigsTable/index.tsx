import pluginId from '../../pluginId';
import Config from '../../../../types/Config';
import { Table, TFooter, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { useMemo, useState } from 'react';
import { getFetchClient } from '@strapi/helper-plugin';


export default function ConfigsTable() {
    const [data, setData] = useState<Config[]>([]);
    const {get} = getFetchClient();

    useMemo(() => {
        get(`/${pluginId}/config`).then((res) => {
            setData(res.data);
        });
    }, [setData]);
    console.log(data);
    const COL_COUNT = 4;

    console.log(data)
    

    return (
        <Table colCount={COL_COUNT} footer={<TFooter icon={<Plus />}>Add another workflow</TFooter>}>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>GitHub Account</Th>
                    <Th>Repo</Th>
                    <Th>Branch</Th>
                    <Th>Workflow</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data && data.map((config) => (
                    <Tr key={config.id}>
                        <Td>{config.id}</Td>
                        <Td>{config.githubAccount}</Td>
                        <Td>{config.repo}</Td>
                        <Td>{config.branch}</Td>
                        <Td>{config.workflow}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}