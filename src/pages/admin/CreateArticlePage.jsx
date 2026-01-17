
import React from 'react';
import ArticleForm from '@/components/admin/ArticleForm';
import { Helmet } from 'react-helmet';

const CreateArticlePage = () => {
  return (
    <>
      <Helmet>
        <title>Create New Article - Admin</title>
      </Helmet>
      <ArticleForm />
    </>
  );
};

export default CreateArticlePage;
