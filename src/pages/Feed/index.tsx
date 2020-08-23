import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import { Post, Header, Avatar, Name, Description, Loading } from './styles';
import LazyImage from '../../components/LazyImage';

interface Item {
  id: any;
  image: string;
  small: string;
  aspectRatio: number;
  description: string;
  authorId: number;
  author: Author;
}

interface Author {
  avatar: string;
  name: string;
}

const Feed: React.FC = () => {
  const [feed, setFeed] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;
    if (loading) return;

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
    );

    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItems / 5));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }: any) => {
    setViewable(changed.map(({ item }: any) => item.id));
  }, []);

  const Item = (item: Item) => {
    return (
      <Post>
        <Header>
          <Avatar source={{ uri: item.author.avatar }} />
          <Name>{item.author.name}</Name>
        </Header>

        <LazyImage
          aspectRatio={item.aspectRatio}
          source={{ uri: item.image }}
          smallSource={{ uri: item.small }}
        />

        <Description>
          <Name>{item.author.name}</Name> {item.description}
        </Description>
      </Post>
    );
  };

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={(post: Item) => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        ListFooterComponent={(loading && <Loading />) || null}
        renderItem={({ item }) => <Item {...item} />}
      />
    </View>
  );
};

export default Feed;
