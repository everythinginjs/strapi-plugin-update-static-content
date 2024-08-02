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
  Main,
} from '@strapi/design-system';
import { Plus, Trash } from '@strapi/icons';
import { useMemo, useState } from 'react';
import { getFetchClient } from '@strapi/helper-plugin';
import { Link } from 'react-router-dom';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import PageLoading from '../PageLoading';
import { ConfirmDialog } from '../ConfirmDialog';

interface ConfigResponse {
  data: Config[];
}

export default function ConfigsTable() {
  const [data, setData] = useState<Config[]>([]);
  const { get, del } = getFetchClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConformDialogOpen] = useState<boolean>(false);
  const CONFIRM_DELETE_MESSAGE = useFormattedLabel('settings.table.confirmDelete.message');

  useMemo(() => {
    setIsLoading(true);
    get<any, ConfigResponse>(`/${pluginId}/config`)
      .then((res) => {
        setIsLoading(false);
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
        setIsLoading && setIsLoading(true);
        const newData = await get<any, ConfigResponse>(`/${pluginId}/config`);
        setData(newData.data);
        setIsLoading && setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  }

  const toggleConfirmDialog = () => {
    setIsConformDialogOpen((prev) => !prev);
  };

  const COL_COUNT = 4;

  const FooterButton = () => {
    const FOOTER_LABEL = useFormattedLabel('settings.table.footer.label');
    return (
      <TFooter
        as={Link}
        to={(location) => ({ ...location, pathname: `${location.pathname}/new-workflow` })}
        style={{ textDecoration: 'none' }}
        icon={<Plus />}
      >
        {FOOTER_LABEL}
      </TFooter>
    );
  };

  return isLoading ? (
    <PageLoading />
  ) : (
    <Main width="100%">
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
                      <ConfirmDialog
                        bodyText={{
                          id: 'settings.table.confirmDelete.message',
                          defaultMessage: CONFIRM_DELETE_MESSAGE,
                        }}
                        title={{
                          id: 'settings.table.confirmDelete.title',
                          defaultMessage: useFormattedLabel('settings.table.confirmDelete.title'),
                        }}
                        rightButtonText={{
                          id: 'settings.table.confirmDelete.confirm',
                          defaultMessage: useFormattedLabel('settings.table.confirmDelete.confirm'),
                        }}
                        isOpen={isConfirmDialogOpen}
                        onToggleDialog={toggleConfirmDialog}
                        onConfirm={() => handleDetete(`${config.id}`)}
                      />
                      <IconButton onClick={toggleConfirmDialog} label="Delete" borderWidth={0}>
                        <Trash />
                      </IconButton>
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Main>
  );
}
