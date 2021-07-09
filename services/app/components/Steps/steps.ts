export interface Step {
  id: string;
  title?: string;
  description?: string;
}
const steps: Step[] = [
  {
    id: '1',
    title: 'Step 1',
    description: 'Upload & Explore',
  },
  {
    id: '2',
    title: 'Step 2',
    description: 'Review & Refine',
  },
  {
    id: '3',
    title: 'Step 3',
    description: 'Request & Release',
  },
];

export { steps };