import { Injectable } from '@nestjs/common';
import { User } from './User';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UserRole } from 'src/enums/UserRole';

@Injectable()
export class UsersService {
  private readonly adminsTableName = 'admins';
  private readonly customersTableName = 'customers';
  private readonly emailColumnName = 'email';
  private readonly phoneNumColumnName = 'phone_num';

  constructor(private readonly supabaseService: SupabaseService) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    let user: User = await this.getUser(
      this.adminsTableName,
      this.emailColumnName,
      email,
      UserRole.Admin,
    );
    if (user) return user;

    user = await this.getUser(
      this.customersTableName,
      this.emailColumnName,
      email,
      UserRole.Customer,
    );
    if (user) return user;

    return null;
  }

  async findUserByPhoneNumber(phoneNum: string): Promise<User | undefined> {
    let user: User = await this.getUser(
      this.adminsTableName,
      this.phoneNumColumnName,
      phoneNum,
      UserRole.Admin,
    );
    if (user) return user;

    user = await this.getUser(
      this.customersTableName,
      this.phoneNumColumnName,
      phoneNum,
      UserRole.Customer,
    );
    if (user) return user;

    return null;
  }

  async getUser(
    tableName: string,
    columnName: string,
    columnValue: string,
    userRole: UserRole,
  ) {
    const { data } = await this.supabaseService.supabaseClient
      .from(tableName)
      .select()
      .eq(columnName, columnValue);

    if (data.length === 0) return null;

    switch (userRole) {
      case UserRole.Admin:
        return this.getUserFromAdmin(data[0]);
      case UserRole.Customer:
        return this.getUserFromCustomer(data[0]);
      default:
        break;
    }
  }

  getUserFromAdmin(admin: any) {
    const user: User = {
      id: admin.admin_id,
      password: admin.password,
      role: UserRole.Admin,
    };

    return user;
  }

  getUserFromCustomer(customer: any) {
    const user: User = {
      id: customer.customer_id,
      password: customer.password,
      role: UserRole.Customer,
    };

    return user;
  }
}
