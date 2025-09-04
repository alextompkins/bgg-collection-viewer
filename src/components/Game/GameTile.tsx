import { Anchor, Badge, Button, Card, Group, Image, Pill, Stack, Text } from '@mantine/core';

import type { Game } from '../../models/game.ts';

export const GameTile = ({
  bggId,
  imageUrl,
  name,
  yearPublished,
  minPlayers,
  maxPlayers,
  minPlaytime,
  maxPlaytime,
  mechanics,
  description,
}: Game) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section mb="md">
        <Image src={imageUrl} alt={name} loading="lazy" />
      </Card.Section>

      <Stack spacing="md">
        <Group justify="space-between">
          <Text fw={600} size="lg">
            {name}
          </Text>
          <Badge color="gray">{yearPublished}</Badge>
        </Group>

        {description ? (
          <Text size="sm" c="dimmed">
            {description.slice(0, 200)}...
          </Text>
        ) : undefined}

        <Stack spacing="xs">
          <Text size="sm">
            👥 {minPlayers}-{maxPlayers} players
          </Text>
          <Text size="sm">
            ⏳ {minPlaytime === maxPlaytime ? minPlaytime : `${minPlaytime}-${maxPlaytime}`} mins
          </Text>
        </Stack>

        {mechanics ? (
          <Group>
            {mechanics.map(({ name, id }) => (
              <Pill key={id}>{name}</Pill>
            ))}
          </Group>
        ) : undefined}

        <Anchor
          href={`https://boardgamegeek.com/boardgame/${bggId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button color="red" fullWidth mt="md" radius="md">
            View on BGG
          </Button>
        </Anchor>
      </Stack>
    </Card>
  );
};
