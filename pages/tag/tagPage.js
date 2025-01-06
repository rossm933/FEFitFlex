import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllTags } from '../../api/tagData';
import TagCard from '../../components/cards/TagCard';
import { useAuth } from '../../utils/context/authContext';

export default function Tags() {
  const { user } = useAuth();
  const router = useRouter();
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    if (user?.id) {
      try {
        const data = await getAllTags();
        setTags(data || []);
      } catch (error) {
        setTags([]);
      }
    }
  };

  useEffect(() => {
    getTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Button style={{ background: 'goldenrod', border: 'solid 1px black' }} onClick={() => router.push('/tag/new')}>
        Create Tag
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tags.map((tag) => (
          <TagCard
            key={tag.id}
            tagObj={tag}
            onUpdate={getTags}
          />
        ))}
      </div>
    </div>
  );
}
