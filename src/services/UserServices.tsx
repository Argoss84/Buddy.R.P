import { supabaseClient } from '../context/AuthenticationContect';

export async function getUserWithAccessRights(authUserId: any) {
    const { data, error } = await supabaseClient
        .from('users')
        .select(`
            *,
            user_access_rights (
                access_rights (
                    id,
                    name,
                    description
                )
            )
        `)
        .eq('auth_user_id', authUserId);

    if (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        return null;
    }

    return data;
}
