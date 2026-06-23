export type Ingredient = {
  amount: string;
  name: string;
};

export type Recipe = {
  title: string;
  description: string;
  time: string;
  servings: string;
  ingredients: Ingredient[];
  steps: string[];
};
