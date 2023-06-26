const Discord = require('discord.js');

// Crée une classe pour le bot Discord
class RandomPhraseBot {
    constructor() {
      this.phrases = [
        "Tout bonheur commence par un petit-déjeuner tranquille.",
        "Celui qui sait s'arrêter ne périclite jamais.",
        "Il est difficile d'attraper un chat noir dans une pièce sombre, surtout lorsqu'il n'y est pas.",
        "Il ne suffit pas d'avoir raison, il faut aussi se le faire pardonner.",
        "Un repas partagé est un repas bien assaisonné.",
        "Un jour sans rire est un jour perdu, sauf si vous avez perdu votre dentier.",
        "Mieux vaut tard que jamais, sauf si vous êtes en retard pour un rendez-vous chez le dentiste.",
        "Qui mange un oignon, rote comme un démon.",
        "Le silence est d'or, mais le ronflement est en argent.",
        "Un de perdu, dix de retrouvés, sauf si vous perdez vos dix doigts.",
        "Il n'y a pas de fumée sans feu, sauf si vous fumez des bonbons.",
        "Un œil pour un œil, et tout le monde sera borgne.",
        "Rien ne sert de courir, il faut partir à point, surtout pour attraper le train.",
        "Mieux vaut prévenir que guérir, sauf si vous êtes un médecin.",
        "Les absents ont toujours tort, sauf s'ils ont raison par télépathie.",
        "On n'apprend pas à un vieux singe à faire des grimaces, sauf s'il est atteint de démence sénile.",
        "Quand le chat n'est pas là, les souris dansent, à moins qu'elles ne se mettent à jouer au poker.",
        "Qui vole un œuf, vole un bœuf, mais vole rarement des œufs.",
        "Les paroles s'envolent, les écrits restent, mais les SMS sont sauvegardés dans le cloud.",
        "L'argent ne fait pas le bonheur, mais il permet d'acheter des glaces.",
        "Rira bien qui rira le dernier, à moins qu'il ne soit sourd.",
        "Le ridicule ne tue pas, sauf si vous vous moquez d'un ninja.",
        "La curiosité est un vilain défaut, sauf si vous êtes détective privé.",
        "La fortune sourit aux audacieux, mais elle préfère les chèques.",
        "Qui ne dit mot consent, mais qui dit mot de passe se connecte.",
        "Chassez le naturel, il revient au galop, sauf s'il est fatigué.",
        "Le temps, c'est de l'argent, mais la procrastination est gratuite.",
        "Un homme averti en vaut deux, à moins qu'il ne soit unijambiste.",
        "Il faut battre le fer tant qu'il est chaud, et ne pas oublier les gants de protection.",
        "Les voyages forment la jeunesse, mais ils épuisent les adultes.",
        "La beauté est dans l'œil de celui qui regarde, mais les miroirs sont là pour vous rappeler la réalité.",
        "Petit à petit, l'oiseau fait son nid, sauf s'il est un oiseau migrateur.",
        "Mieux vaut être seul que mal accompagné, sauf si vous êtes perdu dans la forêt.",
        "Les grands esprits se rencontrent, mais les esprits étroits se croisent.",
        "La nuit porte conseil, mais elle ne répond pas aux e-mails.",
        "Il n'y a pas de fumée sans feu, sauf si vous êtes un dragon d'eau.",
        "Les bonnes choses viennent à qui sait attendre, mais les pizzas arrivent plus rapidement.",
        "Rire est le meilleur régime, sauf si vous mangez un gâteau en même temps.",
        "La vie est comme un arc-en-ciel, il faut de la pluie et du soleil pour en profiter... et un parapluie.",
        "Mieux vaut être incompris que mal compris, sauf si vous essayez de construire un meuble IKEA.",
        "Les lunettes sont comme les chaussettes, mieux vaut en avoir deux.",
        "Le sommeil est la meilleure thérapie, sauf si vous avez un rêve étrange avec des pingouins qui dansent.",
        "La patience est une vertu, surtout quand il s'agit d'attendre allo j'ai soif.",
        "Un sourire est une clé secrète qui ouvre de nombreuses portes, sauf les portes automatiques.",
        "La vie est courte, alors souriez pendant que vous avez encore toutes vos dents.",
        "Le temps c'est de l'argent, mais dépenser tout votre argent sur une montre n'est pas une bonne idée.",
        "La curiosité a tué le chat, mais heureusement je suis un chien.",
        "Le sport, c'est bon pour la santé, mais la sieste est encore meilleure",
        "L'intelligence artificielle n'est rien comparée à la stupidité naturelle.",
        "Un ami qui rit est un ami de qualité, mais un ami avec de la bière est encore mieux.",
        "Le chocolat est le remède universel, sauf si vous êtes allergique au bonheur.",
        "Les paroles s'envolent, les tweets restent et les trolls prospèrent.",
        "Le temps, c'est de l'argent, sauf si vous le passez à regarder des vidéos de chatons sur Internet.",
        "Les souvenirs sont faits de moments précieux, mais aussi de photos embarrassantes que vos amis gardent précieusement.",
        "Celui qui rit le dernier n'a probablement pas compris la blague.",
        "Ça ne sert à rien de serrer les fesses après avoir pété.",
        "On apprend peu par la victoire, mais beaucoup par la défaite"

    ];
}
}

module.exports = RandomPhraseBot;