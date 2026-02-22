import { useLanguage } from "@/lib/LanguageContext";

export default function Terms() {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black tracking-tight">{t('termsOfServiceTitle')}</h1>
                <p className="text-muted-foreground">{t('lastUpdated')}: February 21, 2026</p>
            </div>

            <div className="glass p-12 rounded-[2.5rem] border-primary/5 space-y-8 leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">{t('acceptanceTermsTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('acceptanceTermsText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">{t('serviceDescTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('serviceDescText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">{t('userConductTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('userConductText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">{t('equipmentRentalTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('equipmentRentalText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">{t('liabilityTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('liabilityText')}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600">{t('governingLawTitle')}</h2>
                    <p className="text-muted-foreground">
                        {t('governingLawText')}
                    </p>
                </section>
            </div>
        </div>
    );
}
