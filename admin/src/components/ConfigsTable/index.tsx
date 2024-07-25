import pluginId from '../../pluginId';
import Config from '../../../../types/Config';
import {
  Table,
  TFooter,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Flex,
  Box,
  IconButton,
} from '@strapi/design-system';
import { Plus, Trash } from '@strapi/icons';
import { useMemo, useState } from 'react';
import { getFetchClient } from '@strapi/helper-plugin';

export default function ConfigsTable() {
  const [data, setData] = useState<Config[]>([]);
  const { get, del } = getFetchClient();

  useMemo(() => {
    get(`/${pluginId}/config`).then((res) => {
      setData(res.data);
    });
  }, [setData]);

  async function handleDetete(id: string) {
    const deleteConfirm = await del(`/${pluginId}/config/${id}`);
    if (deleteConfirm) {
      const newData = await get(`/${pluginId}/config`);
      setData(newData.data);
    }
  }

  const COL_COUNT = 4;

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
        {data &&
          data.map((config) => (
            <Tr key={config.id}>
              <Td>{config.id}</Td>
              <Td>{config.githubAccount}</Td>
              <Td>{config.repo}</Td>
              <Td>{config.branch}</Td>
              <Td>{config.workflow}</Td>
              <Td>
                <Flex>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => handleDetete(`${config.id}`)} label="Delete" borderWidth={0}>
                      <Trash />
                    </IconButton>
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
