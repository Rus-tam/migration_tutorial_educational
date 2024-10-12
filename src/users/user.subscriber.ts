import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { User } from "./entities/user.entity";
import { Logger } from "@nestjs/common";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    private readonly logger = new Logger(UserSubscriber.name);

    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>): Promise<any> | void {
        this.logger.log(`beforeInsert`, JSON.stringify(event.entity));
    }

    afterInsert(event: InsertEvent<User>): Promise<any> | void {
        this.logger.log(`afterInsert`, JSON.stringify(event.entity));
    }
}