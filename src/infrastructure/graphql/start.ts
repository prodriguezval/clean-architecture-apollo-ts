import { main } from "infrastructure/graphql/server";
import { logger } from "infrastructure/logger/loggerConfig";

main().catch((e) => logger().error("Error starting the server", e));
