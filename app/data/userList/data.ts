import { faker } from "@faker-js/faker";
import { User } from "screens/listAnimations/ListAnimation.types";

export const data: User[] = new Array(30).fill(0).map(() => ({
  id: faker.datatype.uuid(),
  avatar: faker.image.avatar(),
  name: faker.name.fullName(),
  jobTitle: faker.name.jobTitle(),
  email: faker.internet.email(),
}));
