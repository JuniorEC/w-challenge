import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.Map<string> })
  address: {
    street: string;
    neighborhood: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
