import React from 'react';
import '../CardListStyles.css';
import { Text, Flex, Stack } from '@chakra-ui/react';
import NewsCard from './NewsCard';
import { Link } from 'react-router-dom';

const NewsList = ({ news }) => {

  return !(news.length === 0) ? (
    <div>
      <Flex justifyContent='center' alignItems='center'>
        <Text
          fontSize={{ base: '20px', md: '40px' }}
          as='h1' fontWeight='700'
          color='#9AC9FB' zIndex='9'
          mb = '5'
        >
          Ultimas novedades
        </Text>
      </Flex>
      <Stack direction={['column', 'row']} spacing="24px" className="list-container">
        {
          news.map(x =>
            <div className="card-info" key={x.id}>
              <Link to={`/news/${x.id}`}>
                <NewsCard title={x.name} imageUrl={x.image} content={x.content} />
              </Link>
            </div>)
        }
      </Stack>
    </div>
  ) : 
    <Flex justifyContent='center' alignItems='center'>
      <Text
        fontSize={{ base: '20px', md: '40px' }}
        as='h1' fontWeight='700'
        color='#9AC9FB' zIndex='9'
      >
        No hay nuevas novedades
      </Text>
    </Flex>;
};

export default NewsList;