import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../../";

@Table({
  tableName: "sessions"
})
export default class Session extends Model<Session> {

  @AllowNull(false)
  @Column
  uuid: string;
  
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column
  ip: string;

  @Column
  forwardedIp: string;

  @Column
  login: Date;

  @Column
  logout: Date;

  @Column
  online: boolean;
}

Object.assign(Session, {
  async onLogin() {
    const { request, authToken } = this;
    const { connection, headers } = request;
    await Session.create({
      uuid: this.id,
      userId: authToken.id,
      ip: connection.remoteAddress,
      forwardedIp: headers["x-forwarded-for"]
    });
  },
  async onLogout(t) {
    const token = this.authToken || t;
    if (!token) return;
    const session = await Session.findOne({ where: { uuid: this.id } });
    if (!session) return;
    session.update({ logout: new Date(), online: false });
  }
});

// Instance methods
Object.assign(Session.prototype, {});