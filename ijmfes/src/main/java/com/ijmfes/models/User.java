package com.ijmfes.models;

import javax.persistence.*;
import lombok.Data;
import javax.validation.constraints.Email;


@Entity
@Data
@Table(name = "users", schema = "public")
public class User {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@OneToOne()
    @JoinColumn(name="prof_id")
	private Professeur prof;
	
	@OneToOne()
    @JoinColumn(name="etudiant_id")
    private Etudiant etudiant;

	@Column(name = "first_name", length = 75)
	private String firstName;

	@Column(name = "last_name", length = 80)
	private String lastName;

	@Column(name = "username", length = 65)
	private String username;

	@Column(name = "password", length = 64)
	private String password;

	@Column(name = "email", length = 115)
	private String email;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id")
	private Role role;
}