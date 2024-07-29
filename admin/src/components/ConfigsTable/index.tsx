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
import { Link } from 'react-router-dom';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import { ConfirmModal } from '../ConfirmModal';

interface ConfigResponse {
  data: Config[];
}

export default function ConfigsTable() {
  const [data, setData] = useState<Config[]>([]);
  const { get, del } = getFetchClient();

  const CONFIRM_DELETE_TITLE = useFormattedLabel('settings.table.confirmDelete.title');
  const CONFIRM_DELETE = useFormattedLabel('settings.table.confirmDelete.confirm');

  useMemo(() => {
    get<any, ConfigResponse>(`/${pluginId}/config`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setData]);

  async function handleDetete(id: string) {
    const deleteConfirm = await del(`/${pluginId}/config/${id}`);
    if (deleteConfirm) {
      try {
        const newData = await get<any, ConfigResponse>(`/${pluginId}/config`);
        setData(newData.data);
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  const COL_COUNT = 4;

  const FooterButton = () => {
    const FOOTER_LABEL = useFormattedLabel('settings.table.footer.label');
    return (
      <Link to={(location) => ({ ...location, pathname: `${location.pathname}/new-workflow` })}>
        <TFooter icon={<Plus />}>{FOOTER_LABEL}</TFooter>
      </Link>
    );
  };

  return (
    <Table colCount={COL_COUNT} footer={<FooterButton />}>
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
                    <ConfirmModal
                      onConfirm={() => handleDetete(`${config.id}`)}
                      title={CONFIRM_DELETE_TITLE}
                      confirmMsg={CONFIRM_DELETE}
                    >
                      {(onOpen) => (
                        <IconButton onClick={onOpen} label="Delete" borderWidth={0}>
                          <Trash />
                        </IconButton>
                      )}
                    </ConfirmModal>
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
