'use client';
import React from 'react';
import {InboxSolid, ArchiveBox, Trash, FolderOpen} from '@medusajs/icons';
import {
  PaperPlaneIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons';
import { Grid, Box, Text, TextField, Button, Flex } from "@radix-ui/themes";
import Header from "@/components/layout/header/Header";

const folders = [
  { label: 'Inbox', icon: <InboxSolid /> },
  { label: 'Saved', icon: <ArchiveBox /> },
  { label: 'Drafts', icon: <FolderOpen /> },
  { label: 'Sent', icon: <PaperPlaneIcon className='w-5 h-4'/> },
  { label: 'Trash', icon: <Trash /> }
];

export default function BaseMail() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-8 py-16 h-full">
        <Grid columns="3" gap="3" width="auto" className="h-full">
          <Box id="mail-boxes">
          <TextField.Root placeholder="Search folders…">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Flex className='flex-col gap-3 m-4 mt-5'>
            {folders.map(({ icon, label }) => (
              <Button variant='ghost' size='3' color='gray' key={label} >
                {icon}
                <Text className='w-full flex justify-start'>
                {label}
                </Text>
              </Button>
            ))}
            </Flex>
          </Box>
          <Box id="mails" style={{ gridColumn: 'span 2' }}>
            <Text>
              Hello World
            </Text>
          </Box>
        </Grid>
      </main>
    </>
  );
}
