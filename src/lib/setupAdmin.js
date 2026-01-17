
import { supabase } from './customSupabaseClient';
import bcrypt from 'bcryptjs';

export const setupInitialAdmin = async () => {
  const email = 'dellavalentina.daniel@gmail.com';
  const password = 'msimd2gd3';

  try {
    // 1. Check if user already exists
    const { data: existingUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      console.log('Admin user already exists.');
      return { success: true, message: 'Admin user already exists.' };
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insert user
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        { 
          email, 
          password_hash: passwordHash, 
          role: 'superadmin' 
        }
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('Initial admin created successfully:', data);
    return { success: true, message: 'Initial admin created successfully.' };

  } catch (error) {
    console.error('Error setting up admin:', error);
    return { success: false, error: error.message };
  }
};
