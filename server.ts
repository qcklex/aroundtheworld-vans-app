import { createServer, Model, Response, Registry } from "miragejs";
import { ModelDefinition, Server } from "miragejs/-types";

interface Van {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: "simple" | "rugged" | "luxury";
  hostId: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const VanModel: ModelDefinition<Van> = Model.extend({});
const UserModel: ModelDefinition<User> = Model.extend({});

createServer({
  models: {
    vans: VanModel,
    users: UserModel,
  },

  routes() {
    this.namespace = "api";

    this.get("/vans", (schema, request) => {
      return schema.all("van");
    });

    this.get("/vans/:id", (schema, request) => {
      const id = request.params.id;
      return schema.find("van", id);
    });
  }
});
