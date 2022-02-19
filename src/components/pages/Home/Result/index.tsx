import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { ResponseData } from '../hooks';

export type Props = {
  className?: string;
  data?: ResponseData;
};

const Result: React.FC<Props> = ({ className, data }) => {
  return (
    <Box m={10}>
      <Flex direction="column" align="center">
        <Text>判定結果</Text>
        <Box mt={10}>
          <Text>
            {data?.shouldEvacuate
              ? `今すぐ避難が必要です。`
              : `自宅で待機してください。`}
          </Text>
        </Box>
        <Box mt={10}>
          <Text>{data?.message}</Text>
        </Box>
        <Box mt={10}>
          {data?.userBuilding && (
            <>
              <Text>ユーザー建物情報</Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>地上階数</Th>
                    <Th>建物高</Th>
                    <Th>浸水深</Th>
                    <Th>深さランク</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{data?.userBuilding?.id}</Td>
                    <Td>{data?.userBuilding?.storeysAboveGround}</Td>
                    <Td>{data?.userBuilding?.height}</Td>
                    <Td>{data?.userBuilding?.depth}</Td>
                    <Td>{data?.userBuilding?.depthRank}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </>
          )}
        </Box>
        {data?.nearestShelter && (
          <>
            <Text>最寄り避難所情報</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>施設名</Th>
                  <Th>緯度</Th>
                  <Th>軽度</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{data.nearestShelter.name}</Td>
                  <Td>{data.nearestShelter.lat}</Td>
                  <Td>{data.nearestShelter.lng}</Td>
                </Tr>
              </Tbody>
            </Table>
          </>
        )}
      </Flex>
      <Box mt={10}>
        <Flex justifyContent="center">
          <a href="https://geohack-teama.github.io/sample_map/">
            避難経路はこちら
          </a>
        </Flex>
      </Box>
    </Box>
  );
};

export default Result;
