import { yup, validateYupSchema } from '@strapi/utils';

const validateConfig = validateYupSchema(
  yup.object({
    githubToken: yup.string().trim().required(),
    githubAccount: yup.string().trim().required(),
    repo: yup.string().trim().required(),
    workflow: yup.string().trim().required(),
    branch: yup.string().trim().required(),
  })
);

export { validateConfig };